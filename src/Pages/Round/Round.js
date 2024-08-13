import React, { useEffect, useState } from 'react';
import "./Round.css";
import { useNavigate } from 'react-router-dom';
// mui imports
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import RoundDatasetSelection from './components/dataset_selection/RoundDatasetSelection';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import RoundInteractivePreprocessing from './components/interactive_preprocessing/RoundInteractivePreprocessing';
import RoundInteractiveSearch from './components/interactive_search/RoundInteractiveSearch';

function Round() {
    const [start, setStart] = useState(false);
    const [stage, setStage] = useState(0);
    const [searchChats, setSearchChats] = useState([
        {
            "role": "user",
            "content": "image dataset"
        },
        {
            "role": "assistant",
            "content": "What type of images are you looking for (e.g. objects, scenes, faces, medical, etc.)?"
        },
        {
            "role": "user",
            "content": "Image Segmentation Dataset"
        },
        {
            "role": "search",
            "query": "Image Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
            ],
        },
        {
            "role": "user",
            "content": "Segmentation"
        },
        {
            "role": "search",
            "query": "Image Segmentation Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": true
                },
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                }
            ],
        },
        {
            "role": "user",
            "content": "Animal"
        },
        {
            "role": "search",
            "query": "Animal Segmentation Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": 'images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
            ],
        },
    ]);
    const [preprocessChats, setPreprocessChats] = useState([
        {
            "role": "user",
            "content": "image height 100"
        },
        {
            "role": "assistant",
            "content": "What type of preprocessing would you like to perform on your dataset (e.g. resizing, normalization, data augmentation)?"
        },
        {
            "role": "user",
            "content": "i want flip, rotate"
        },
    ]);
    const [searchHistory, setSearchHistory] = useState([
        {
            "query": "Image Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
            ],
        },
        {
            "query": "Image Segmentation Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": true
                },
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                }
            ],
        },
        {
            "query": "Animal Segmentation Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
            ],
        },
        {
            "query": "Animal Segmentation Dataset",
            "datasets": [
                {
                    "name": "LSPet",
                    "image": process.env.PUBLIC_URL + '/images/ROUND_logo_white.png',
                    "description": "CVPR 2020, SNU AI Lab",
                    "selected": false
                },
            ],
        },
    ]);
    const [selections, setSelections] = useState([]);
    const [preprocessProperties, setPreprocessProperties] = useState("");

    const navigate = useNavigate(); // useNavigate hook to navigate programmatically

    useEffect(() => {
        getSearchChats()
        getPreprocessChats()
    }, [])


    // transision functions
    const onClickSearchInput = () => {
        if(!start) setStart(true);
    }
    
    const onClickNextPage = () => {
        setStage(stage + 1);
        if (stage === 1) {
            postSelections(selections)
        }
    }

    const onClickPrevPage = () => {
        setStage(stage - 1);
    }

    // interactive search functions
    const postSearchQuery = async (query) => {
        try {
            const response = await fetch("http://127.0.0.1:3003/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_input: query.content }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
            
            // setSearchChats(prevChats => [...prevChats, query])
            setSearchChats(prevChats => [...prevChats, data]); //여기가 data.response였슴
            const searchChatsTemp = [...searchChats, data]
            setValues(searchChatsTemp)

            // return data;
        } catch (error) {
            console.error("Error posting search query:", error);
            setSearchChats(prevChats => [...prevChats, { role: "assistant", content: "blah blah blah" }]);
        }
    } // TODO: need code to interact with backend
    const getSearchChats = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3003/query", {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json(); // This will parse the JSON response correctly
            setSearchChats(data);
            setValues(data)
            // return data;
        } catch (error) {
            console.error("Error fetching search history:", error);
        }
    } // TODO: need code to interact with backend

    const onSubmitSearchQuery = (query) => {
        // backend interactions and setting states
        setSearchChats(prevChats => [...prevChats, query])
        postSearchQuery(query) // post query to backend
    }

    // dataset selection functions
    const postSelections = async (newSelections) => {
        try {
            const selectionIds = []

            for(var i=0; i<newSelections.length; i++) {
                const chatIndex = newSelections[i][0];
                const datasetIndex = newSelections[i][1];
                selectionIds.push(searchChats[chatIndex]["datasets"][datasetIndex]["_id"])
            }

            await fetch("http://147.46.121.38:3003/selections", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"selections": selectionIds}),
            })
        } catch (error) {
            console.error("Error posting selections:", error);
        }
    }

    const onClickDataset = (chatIndex, datasetIndex) => {
        console.log(searchChats)
        console.log(chatIndex)
        console.log(datasetIndex)
        const searchChatsTemp = searchChats
        searchChatsTemp[chatIndex]["datasets"][datasetIndex]["selected"] = !searchChats[chatIndex]["datasets"][datasetIndex]["selected"]
        setSearchChats(searchChatsTemp)
        setValues(searchChatsTemp)
    }

    const onDeleteSelection = (chatIndex, datasetIndex) => {
        const searchChatsTemp = searchChats
        searchChatsTemp[chatIndex]["datasets"][datasetIndex]["selected"] = false
        setSearchChats(searchChatsTemp)
        setValues(searchChatsTemp)
    }

    const setValues = (data) => { // temporary function
        const searchHistoryTemp = []
        const selectionsTemp = []

        for(var i=0; i<data.length; i++) {
            if(data[i]["role"] === "search") {
                searchHistoryTemp.push({
                    "chat_id": i,
                    "query": data[i]["query"],
                    "datasets": data[i]["datasets"]
                })

                const datasets = data[i]["datasets"];
                for(var j=0; j<datasets.length; j++) {
                    if(datasets[j]["selected"]) selectionsTemp.push([i, j])
                }
            }
        }

        setSearchHistory(searchHistoryTemp)
        setSelections(selectionsTemp);
        // updateSelections(selectionsTemp);
    }

    // interactive preprocessing functions
    const postPreprocessInput = async (query) => {
        try {
            const response = await fetch("http://147.46.121.38:3003/preprocess", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_input: query.content }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
           
            // setSearchChats(prevChats => [...prevChats, query])
            setPreprocessChats(prevChats => [...prevChats, data]); //여기가 data.response였슴
            console.log(data)
            setPreprocessProperties(data["summary"])

            // return data;
        } catch (error) {
            console.error("Error posting preprocess query:", error);
            setPreprocessChats(prevChats => [...prevChats, { role: "assistant", content: "blah blah blah" }]);
        }
    } // TODO: need code to interact with backend
    const getPreprocessChats = async () => {
        try {
            const response = await fetch("http://147.46.121.38:3003/preprocess", {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json(); // This will parse the JSON response correctly
            setPreprocessChats(data);
            if(data.length > 0) {
                setPreprocessProperties(data[data.length - 1]["summary"])
            }
            // return data;
        } catch (error) {
            console.error("Error fetching preprocess history:", error);
        }
    } // TODO: need code to interact with backend -> get assistant output and preprocess properties

    const onSubmitPreprocessQuery = (query) => {
        setPreprocessChats(prevChats => [...prevChats, query])
        postPreprocessInput(query)
    }

    const onClickPreprocessButton = async() => {
        try {
            const response = await fetch("http://147.46.121.38:3003/download");
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'ROUND.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error fetching download file:", error);
        }
    }
    const onClickCustomizeButton = async  () => {
        // navigate('/graph'); // Navigate to the /graph route
        setTimeout(()=>{window.location.href = 'http://127.0.0.1:8008';}, 2000)
        
    }

    return (
        <div className="round">
            <div className="round__header">
                <div className={start? "round__headerLogo round__transparent" : "round__headerLogo"}>
                    <img src={process.env.PUBLIC_URL + '/images/ROUND_logo_white.png'} alt=""/>
                </div>
                <div className="round__headerCenter">
                    <div className='round__textLogo'>
                        <p>R</p>
                        <p className={`round__textLogoO ${start? "round__transparent" : ""}`}>O</p>
                        <img className={`round__textLogoO ${start? "round__show" : "round__transparent"}`} src={process.env.PUBLIC_URL + '/images/ROUND_logo_white.png'} alt=""/>
                        <p>U</p>
                        <p>N</p>
                        <p>D</p>
                    </div>
                    <p className={`round__headerCenterExplanation ${start? "round__transparent" : ""}`}>End-to-End Data Preparation Service</p>
                </div>
                <div className={`round__headerUserIcon ${start? "round__transparent" : ""} base1_background`}>
                    <p className="point1_color">HJ</p>
                </div>
            </div>

            <div className='round__body'>
                <div className='round__pageConvertArrows'>
                    <div onClick={start && stage > 0 && stage <= 2 ? onClickPrevPage : () => {}} className={`base1_color round__previousPage ${start && stage >= 1 ? "round__previousPage--show" : "round__previousPage--hide"}`}>
                        <KeyboardDoubleArrowLeftIcon/>
                        <p>Previous Step</p>
                    </div>
                    <div onClick={() => {
                                if (start && stage >= 0 && stage < 2) {
                                onClickNextPage();
                                setValues(searchChats); // Call setValue() here
                                }
                            }}className={`base1_color round__nextPage ${start && stage <= 1 ? "round__nextPage--show" : "round__nextPage--hide"}`}>
                        <p>Next Step</p>
                        <KeyboardDoubleArrowRightIcon/>
                    </div>
                    {stage == 2 ? <div onClick={onClickCustomizeButton} className={`base1_color round__nextPage ${stage == 2? "round__nextPage--show" : "round__nextPage--hide"}`}>
                        <p>Customize</p>
                        <KeyboardDoubleArrowRightIcon/>
                    </div> : <div></div>}
                </div>

                <div className='round__interactiveSearch'>
                    <RoundInteractiveSearch start={start} onClickSearchInput={onClickSearchInput} onClickDataset={onClickDataset} onSubmitSearchQuery={onSubmitSearchQuery} chatList={searchChats}/>
                </div>

                <div className={`round__datasetSelection point2_background ${start ? (stage===1) ? "round__datasetSelection--fullScreen" : (stage===2) ? "round__datasetSelection--fullScreen round__datasetSelection--hideLeft" : "round__datasetSelection--expand" : "round__datasetSelection--hide"}`}>
                    <RoundDatasetSelection stage={stage} selections={selections} searchHistory={searchHistory} searchChats={searchChats} onClickDataset={onClickDataset} onDeleteSelection={onDeleteSelection}/>
                </div>

                <div className={`round__interactivePreprocessing base2_background ${stage===2 ? "round__interactivePreprocessing--show" : "round__interactivePreprocessing--hide"}`}>
                    <RoundInteractivePreprocessing chatList={preprocessChats} onSubmitPreprocessQuery={onSubmitPreprocessQuery} preprocessProperties={preprocessProperties} onClickPreprocessButton={onClickPreprocessButton} onClickCustomizeButton={onClickCustomizeButton}/>
                </div>
            </div>
        </div>
    );
}

export default Round