export const webhookPayloadParser = (req): Promise<string> =>
    new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            resolve(Buffer.from(data).toString());
        });
    });
