import { PubSub } from "@google-cloud/pubsub";
import logger from "../utils/log.js";

const pubSubClient = new PubSub({projectId: "dev-aditya-mysore"});

const publishUserMessage = async (topicName, data) => {
    const dataBuffer = Buffer.from(data);

    try{
        const messageId = await pubSubClient.topic(topicName).publishMessage({data: dataBuffer});
        logger.info("New message published: " + messageId);
    }
    catch(error){
        logger.error(error.message);
    }
}
export default publishUserMessage;