import { Base } from "./Bases";

interface QuestionBase {
    question: string
}

export interface QuestionDefinition extends QuestionBase, Base {}