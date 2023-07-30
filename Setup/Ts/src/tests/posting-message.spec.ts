import {
    DateProvider,
    EmptyMessageError,
    MessageTooLongError,
    PostMessageCommand,
    PostMessageUseCase,
} from '../post-message.usecase'

import { InMemoryMessageRespository } from '../message.inmemory.repository'
import { Message } from '../message'

describe('Feature: Posting message', () => {
    let fixture: Fixture

    beforeEach(() => {
        fixture = createFixture()
    })

    describe('Rule: A message can contain a maximum of 280 caracters', () => {
        test('Alice can post a message on her timeline', async () => {
            fixture.givenNowIs(new Date('2023-01-19T19:00:00.000Z'))

            await fixture.whenUserPostMessage({
                id: 'message-id',
                text: 'Hello world',
                author: 'Alice',
            })

            fixture.thenPostedMessageShouldBe({
                id: 'message-id',
                author: 'Alice',
                text: 'Hello world',
                publishedAt: new Date('2023-01-19T19:00:00.000Z'),
            })
        })

        test('Alice can cannot post message with more than 280 caracter', async () => {
            const textWithLengtOf281 =
                'Lorem ipsum luctus sociosqu adipiscing elit fames inceptos, lacus velit posuere ante nulla elit quisque hendrerit, netus tortor feugiat sociosqu gravida arcu. Mattis magna phasellus enim tincidunt integer tellus curae eros inceptos laoreet tempor, vel feugiat vivamus aptent just djepdp'

            fixture.givenNowIs(new Date('2023-01-19T19:00:00.000Z'))
            await fixture.whenUserPostMessage({
                id: 'message-id',
                text: textWithLengtOf281,
                author: 'Alice',
            })
            fixture.thenErrorShouldBe(MessageTooLongError)
        })

        test('Alice can cannot post an empty message', async () => {
            fixture.givenNowIs(new Date('2023-01-19T19:00:00.000Z'))
            await fixture.whenUserPostMessage({
                id: 'message-id',
                text: '',
                author: 'Alice',
            })
            fixture.thenErrorShouldBe(EmptyMessageError)
        })

        test('Alice can cannot post a message with only whitespace', async () => {
            fixture.givenNowIs(new Date('2023-01-19T19:00:00.000Z'))
            await fixture.whenUserPostMessage({
                id: 'message-id',
                text: '     ',
                author: 'Alice',
            })
            fixture.thenErrorShouldBe(EmptyMessageError)
        })
    })
})

class StubDateProvider implements DateProvider {
    now: Date
    getNow(): Date {
        return this.now
    }
}

const createFixture = () => {
    const dateProvider = new StubDateProvider()
    const messageRepository = new InMemoryMessageRespository()
    const postMessageUseCase = new PostMessageUseCase(messageRepository, dateProvider)

    let thrownError: Error

    return {
        givenNowIs(now: Date) {
            dateProvider.now = now
        },
        async whenUserPostMessage(postMessageCommand: PostMessageCommand) {
            try {
                await postMessageUseCase.handle(postMessageCommand)
            } catch (err) {
                thrownError = err
            }
        },
        thenPostedMessageShouldBe(expectedMessage: Message) {
            expect(expectedMessage).toEqual(messageRepository.getMessageById(expectedMessage.id))
        },
        thenErrorShouldBe(expectedErrorClass: new () => Error) {
            expect(thrownError).toBeInstanceOf(expectedErrorClass)
        },
    }
}

type Fixture = ReturnType<typeof createFixture>
