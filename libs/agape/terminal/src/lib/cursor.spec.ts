import { getCursorPosition, setCursorPosition } from './cursor'

describe('cursor', () => {

    describe('getCursorPosition', () => {
        it('should be a function',() => {
            expect(getCursorPosition).toBeInstanceOf(Function)
        })
    })

    describe('setCursorPosition', () => {
        it('should be a function',() => {
            expect(setCursorPosition).toBeInstanceOf(Function)
        })
    })

})