import React, { useState } from 'react';
import { questionPropsType } from './../Types/quiz_types';
import { Radio, RadioGroup, FormControl, FormControlLabel, Button, Container, Grid } from '@material-ui/core';
import './../App.css';

const QuestionCard: React.FC<questionPropsType> = ({ question, options, callback }) => {
    // console.log(question, options)
    let [userAns, setUserAns] = useState("");
    let [value, setValue] = useState("");
    const handleSelection = (e: any) => {
        // console.log(e.target.value);
        setValue(e.target.value);
        setUserAns(e.target.value);
    }
    return (
        <Container className="quizDiv">
            <h1 style={{ textAlign: "center" }}>Quiz</h1>
            <div style={{ padding: "20px", textAlign: "center" }}>

                <div className="ques">
                    <h2>{question}</h2>
                </div>
                <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, userAns)}>

                    <FormControl component="fieldset">
                        <RadioGroup name="opt" value={value} onChange={handleSelection} >
                            <Grid container spacing={3}>
                                {
                                    options.map((opt: string, ind: number) => {
                                        return (
                                            <Grid item xs={6} key={ind}>
                                                <FormControlLabel value={opt} control={<Radio color="primary" required />} label={opt} />
                                            </Grid>

                                        )
                                    })
                                }
                            </Grid>
                        </RadioGroup>
                        <Button type="submit" variant="outlined">Submit</Button>
                    </FormControl>
                </form>
            </div>
        </Container>
    );
}

export default QuestionCard;
