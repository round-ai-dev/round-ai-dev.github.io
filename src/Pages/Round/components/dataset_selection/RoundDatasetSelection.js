import React, { useEffect, useState } from 'react';
import "./RoundDatasetSelection.css";

// function imports
import SearchHistory from './SearchHistory';
import RoundSelection from './RoundSelection';

function RoundDatasetSelection({stage, selections, searchHistory, searchChats, onClickDataset, onDeleteSelection}) {
    return (
        <div className={`RoundDatasetSelection ${stage>=1 ? "RoundDatasetSelection--fullScreen" : "RoundDatasetSelection--smallScreen"}`}>
            <div className={`RoundDatasetSelection__selections ${stage>=1 ? "RoundDatasetSelection__selections--fullScreen" : "RoundDatasetSelection__selections--smallScreen"}`}>
                {
                    selections ? selections.map(index => {
                        const i = index[0];
                        const j = index[1];

                        const selection = searchChats[i]["datasets"][j];
                        return (
                            <div className="RoundDatasetSelection__selection">
                                <RoundSelection onDeleteSelection={() => onDeleteSelection(i, j)} image={selection["image"]} name={selection["name"]}/>
                            </div>
                        );
                    }) : ""
                }
                {
                    console.log(searchChats)
                }
            </div>
            <div className={`RoundDatasetSelection__history ${stage>=1 ? "RoundDatasetSelection__history--fullScreen" : "RoundDatasetSelection__history--smallScreen"}`}>
                {
                    searchHistory.map((search, index) => {
                        return (
                            <div className={`RoundDatasetSelection__historyElement ${stage>=1 ? "RoundDatasetSelection__historyElement--fullScreen" : "RoundDatasetSelection__historyElement--smallScreen"}`}>
                                <SearchHistory onClickDataset={(datasetIndex) => onClickDataset(search["chat_id"], datasetIndex)} datasets={search["datasets"]} query={search["query"]}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default RoundDatasetSelection