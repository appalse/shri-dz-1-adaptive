import React, {useState} from 'react';
import {getApiBuildLog, getApiBuildDetails, postApiCommitHash} from './../../controller';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BuildCard from '../BuildCard/BuildCard';
import BuildLog from '../BuildLog/BuildLog';
import LoaderAnimation from '../LoaderAnimation/LoaderAnimation';
import { convertDateTime, convertDuration } from './../../utils';
import './../BuildList/BuildList.scss';
import './../Container/Container.scss';


export default function BuildDetails({match, history}) {
    // отправили запрос на сервер. Нужно, чтобы не отправлять повторяющиеся запросы
    const [hasRequest, setHasRequest] = useState(false);
    // пока нет ответа сервера, то показываем анимацию
    const [hasResponse, setHasResponse] = useState(false);
    // если нет деталей билда, то показываем ошибку
    const [hasDetails, setHasDetails] = useState(false);
    // детали билда
    const [details, setDetails] = useState({
        id: '',
        configurationId: '',
        buildNumber: -1,
        commitMessage: '',
        commitHash: '',
        branchName: '',
        authorName: '',
        status: '',
        start: { date: '', time: ''},
        duration: 0
    });
    // если нет лога билда, то показываем ошибку
    const [hasBuildLog, setHasBuildLog] = useState(false);
    // лог билда
    const [buildLog, setBuildLog] = useState('');

    if (!match.params.id) {
        throw new Error('bad build id');
    }
    
    const buildId = match.params.id;

    if (!hasRequest) {
        getApiBuildDetails(buildId)
            .then(res => {
                const start = res.start ? convertDateTime(res.start) : {time: '-', date: '-'};
                const duration = res.duration ? convertDuration(res.duration) : '0 ч 0 мин';
                if (!hasDetails) {
                    setDetails({
                        id: res.id,
                        configurationId: res.configurationId,
                        buildNumber: res.buildNumber,
                        commitMessage: res.commitMessage,
                        commitHash: res.commitHash,
                        branchName: res.branchName,
                        authorName: res.authorName,
                        status: res.status,
                        start: start,
                        duration: duration
                    });
                    setHasDetails(true);
                }
            })
            .catch(err => {
                console.log('catch in getApiBuildDetails: ', err);
                setHasDetails(false);
            })
            .finally(() => setHasResponse(true));

        getApiBuildLog(buildId)
            .then(res => {
                if (!hasBuildLog) {
                    if (res) {
                        setBuildLog(res);
                    }
                    setHasBuildLog(true);
                }
            })
            .catch(err => {
                console.log('catch in getApiBuildLog: ', err);
                setHasBuildLog(false);
            })
            .finally(() => setHasResponse(true));
        setHasRequest(true);
    }

    async function handleRebuildClick() {
        const commitHash = details.commitHash;
        if (commitHash) {
            postApiCommitHash(commitHash)
                .then(res => {
                    if (res && res.status === 500) {
                        alert(res.data);
                    }
                })
                .catch(err => {
                    console.log('catch in postApiCommitHash: ', err);
                });
        }
    }

    return (
        <div className="Page Page_font_yandex">
            <Header details={true}  history={history} handleBuildRebuildClick={handleRebuildClick} />

            <main className="Main">
                <div className="Container">
                    { !hasResponse ? (<LoaderAnimation />) : 
                        (<>
                            <ul className="BuildList font_size_s">
                                { hasDetails ? 
                                        (<BuildCard 
                                            keyProp={details.buildNumber} 
                                            buildId={details.id} 
                                            buildCaption={details.commitMessage} 
                                            branchName={details.branchName} 
                                            commitHash={details.commitHash} 
                                            authorName={details.authorName} 
                                            date={details.start.date} 
                                            time={details.start.time} 
                                            duration={details.duration} />)
                                        : (<div>Build details were not found. Probably, wrong build Id in url: {buildId}</div>)
                                }
                            </ul>
                            { !hasBuildLog ? (<LoaderAnimation />) : 
                                (<BuildLog logText={buildLog} />)
                            }
                        </>
                        ) 
                    }
                </div>
            </main>

            <Footer />
        </div>        
    );
}