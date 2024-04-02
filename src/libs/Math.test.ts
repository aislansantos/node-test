import { Math } from "./Math";

describe("Testing Math library", () => {
    it("should sum two numbers correctly", () => {
        const response = Math.sum(5, 10);
        expect(response).toBe(15);
    })
    it("should substract two numbers correctly", () => {
        const response = Math.sub(10, 5);
        expect(response).toBe(5);
    })
    it("should multiply two numbers correctly", () => {
        const response = Math.mult(5, 10);
        expect(response).toBe(50);
    })
    it("should divide two numbers correctly", () => {
        const response = Math.div(10, 5);
        expect(response).toBe(2);

        const response2 = Math.div(3, 0);
        expect(response2).toBe(false);
    })
})

