import { MessageRepository } from './post-message.usecase'
import { Message } from './message'
import * as fs from 'fs'
import * as path from 'path'

export class FileSystemMessageRepository implements MessageRepository {
    getAllOfUser(user: string): Promise<Message[]> {
        throw new Error('Method not implemented.')
    }
    message: Message
    save(msg: Message): Promise<void> {
        this.message = msg
        return fs.promises.writeFile(path.join(__dirname, 'message.json'), JSON.stringify(this.message))
    }
}
