import { mergeTypeDefs } from "@graphql-tools/merge";

import transactionTypedef from "./transaction.typeDef.js";
import userTypeDef from "./user.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypedef]);

export default mergedTypeDefs;