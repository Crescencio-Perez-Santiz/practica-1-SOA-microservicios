import amqp from "amqplib";

const rabbitSettings = {
    protocol: "amqp",
    hostname: "localhost",
    port: 5672,
    username: "crescens",
    password: "adminadmin",
    vhost: "/",
    AuthMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};

export async function publishToQueue(queueName: string, data: any) {
    const connection = await amqp.connect(rabbitSettings);
    const channel = await connection.createChannel();
    console.log(`Connected to RabbitMQ server on ${rabbitSettings.hostname}`);

    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

    console.log(`Message sent to queue ${queueName}`);
    await channel.close();
    await connection.close();
}
