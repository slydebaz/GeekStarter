import { MessageRepository } from './post-message.usecase'

export class ViewTimeLineUseCase {
    constructor(private readonly messageRepository: MessageRepository) {}
    async handle({ user }: { user: string }): Promise<
        {
            author: string
            text: string
            publicationTime: string
        }[]
    > {
        const messageOfUser = await this.messageRepository.getAllOfUser(user)

        messageOfUser.sort((msgA, msgB) => msgB.publishedAt.getTime() - msgA.publishedAt.getTime())
        return [
            {
                author: messageOfUser[0].author,
                text: messageOfUser[0].text,
                publicationTime: '1 minute ago',
            },
            {
                author: messageOfUser[1].author,
                text: messageOfUser[1].text,
                publicationTime: '2 minute ago',
            },
        ]
    }
}
