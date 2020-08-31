import {Quiz, QuestionType} from '../Types/quiz_types';

const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5)
export const getQuestions = async(totalQues: number, level: string): Promise<QuestionType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQues}&difficulty=${level}&type=multiple`);
    let {results} = await res.json();
    const quiz:QuestionType[] = results.map((questionObj: Quiz) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            option: shuffle(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return quiz;
}