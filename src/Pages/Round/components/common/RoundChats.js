import React, { useEffect, useRef } from "react";
import "./RoundChats.css";

// mui imports
import Dataset from "../../../../Common/Dataset";

// function imports

function UserChat({content}) {
    return (
        <div className="roundUserChat roundChat base3_background">
            <p>{content}</p>
        </div>
    )
}

function AssistantChat({content}) {
    return (
        <div className="roundAssistantChat roundChat base4_background">
            <img alt="" src={process.env.PUBLIC_URL + '/images/ROUND_logo_white.png'}/>
            <p>{content}</p>
        </div>
    )
}

function SearchChat({query, content, datasets, onClickDataset}) {
    return (
        <div className="roundSearchChat roundChat point1_background">
            <img alt="" src={process.env.PUBLIC_URL + '/images/ROUND_logo_white.png'}/>
            <p>Search results for "{query}"</p>
            <div className="roundSearchChat__datasets">
                {
                    datasets.map((dataset, datasetIndex) => {
                        return (
                            <div className="roundSearchChat__dataset" onClick={() => onClickDataset(datasetIndex)}>
                                <Dataset image={dataset["image"]} name={dataset["name"]} description={dataset["description"]} selected={dataset["selected"]}/>
                            </div>
                        );
                    })
                }
            </div>
            <p>{content}</p>
        </div>
    )
}

function RoundChats({chatList, onClickDataset}) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollIntoView();
    }, [chatList])

    return (
        <div className="roundChats">
            {
                chatList.map((chat, chatIndex) => {
                    if(chat["role"] === "user") {
                        return <UserChat content={chat["content"]}/>
                    }
                    else if(chat["role"] === "assistant") {
                        return <AssistantChat content={chat["content"]}/>
                    }
                    else if(chat["role"] === "search") {
                        return <SearchChat query={chat["tmp"]} content={chat["content"]} datasets={chat["datasets"]} onClickDataset={(datasetIndex) => onClickDataset(chatIndex, datasetIndex)} />
                    }
                    else {
                        return <p>error</p>
                    }
                })
            }
            <div ref={bottomRef} />
        </div>
    );
}

export default RoundChats