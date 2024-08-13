import React, { useEffect, useState } from 'react';
import "./RoundInteractivePreprocessing.css";

// mui imports
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button } from '@mui/material';

// function imports
import RoundChats from '../common/RoundChats';

function RoundInteractivePreprocessing({chatList, onSubmitPreprocessQuery, preprocessProperties, onClickPreprocessButton, onClickCustomizeButton}) {
    const [query, setQuery] = useState("")
    
    const onChangeQuery = (event) => {
        setQuery(event.target.value)
    }

    const onSubmitQuery = (event) => {
        event.preventDefault()
        onSubmitPreprocessQuery({
            "role": "user",
            "content": query
        })
        setQuery("")
    }

    return (
        <div className="roundInteractivePreprocessing">
            <div className="roundInteractivePreprocessing__chatting">
                <div className='roundInteractivePreprocessing__chats'>
                    <div className='roundInteractivePreprocessing__chatsWrap'><RoundChats chatList={chatList}/></div>
                </div>
                <div className='roundInteractivePreprocessing__chatInput base3_background'>
                    <form onSubmit={onSubmitQuery} autoComplete='off'>
                        <input className='base1_color poppins-regular' name="query" placeholder="Enter message" value={query} onChange={onChangeQuery}/>
                        <div type='submit'><SendRoundedIcon className='base4_color' /></div>
                    </form>
                </div>
            </div>
            <div className='roundInteractivePreprocessing__right'>
                <div className='roundInteractivePreprocessing__preprocessProperties point1_background'>
                    <p>Preprocess Property</p>
                    <div className='roundInteractivePreprocessing__propertyList'>
                        {
                            preprocessProperties.split("\n").map(item => {
                                return (
                                    <div>
                                        <p>{item}</p>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='roundInteractivePreprocessing__preprocessButton'>
                    <Button className='point1_background' onClick={onClickCustomizeButton}>Create Pipeline</Button>
                    {/* <Button className='point1_background' onClick={onClickCustomizeButton}>Customize</Button> */}
                </div>
            </div>
        </div>
    )
}

export default RoundInteractivePreprocessing