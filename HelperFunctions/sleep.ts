export async function sleep(ms: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
