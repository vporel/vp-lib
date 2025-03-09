import { Inject } from "@nestjs/common"
import { Client } from "node-mailjet"
import { createTransport } from "nodemailer"
import { MAILER_OPTIONS, MailerOptions } from "./mailer.module"

export class MailerService{
    constructor(@Inject(MAILER_OPTIONS) private readonly options: MailerOptions){}

    async sendEmail(receivers: string|string[], subject: string, body: string): Promise<boolean>{
        if(typeof receivers == "string"){
            if(receivers.indexOf(",") != -1) receivers = receivers.split(",") // Many receivers
            else receivers = [receivers] //One receiver changed into an array
        }
        switch(this.options.apiService){
            case "gmail": return await this.gmail(receivers, subject, body)
            case "mailjet": return await this.mailjet(receivers, subject, body)
        }
    }
    
    private async mailjet(receivers: string[], subject: string, body: string): Promise<boolean>{

        const mailjet = new Client({
            apiKey: this.options.mailjet?.apiKey, 
            apiSecret: this.options.mailjet?.apiSecret
        })
        const mailjetReceiversArray = []
        for(let receiver of receivers) {
            if(receiver != null && receiver != "")
                mailjetReceiversArray.push({Email: receiver})
        }
        try{
            await mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [{
                    From: {Email: this.options.mailjet?.email, Name: this.options.mailjet?.name},
                    To: mailjetReceiversArray,
                    Subject: subject,
                    HTMLPart: body
                }],
            })
            return true
        }catch{
            return false
        }
    }

    private async gmail(receivers: string[], subject: string, body: string): Promise<boolean>{
        const senderEmail = this.options.gmail.email
        const senderPass = this.options.gmail.pass
        const transporter = createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: senderEmail,
                pass: senderPass
            }
        })
        
        return new Promise<boolean>(function (resolve){
            transporter.sendMail({
                from: senderEmail,
                to: receivers,
                subject,
                html: body
            }, err => {
                if(err){
                    if(process.env.APP_ENV == "dev") console.log(err)
                    resolve(false);
                }else{
                    resolve(true)
                }
            })
        });
    }

}