import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaUser, FaTimesCircle} from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'

function Instructions() {
    return (
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li >
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={140}/>
                </li>
                <li >
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className='bg-light' color='#727272' size={140}/>
                </li>
                <li >
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140}/>
                </li>
            </ol>
        </div>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    //How does this function work?
    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.username)
    }
    //Handle username input
    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    render() {
        return(
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input 
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='github-username'
                        autoComplete='false'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className='btn dark-btn'
                        type='submit'
                        disabled={!this.state.username}
                        >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}
PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview( {userName, onReset, label}){
    return(
        <div className='column player'>
        <h3 className='player-label'>{label}</h3>
        <div className='row bg-light'>
            <div className='player-info'>
                <img
                    className='avatar-small'
                    src={`https://github.com/${userName}.png?size=200`}
                    alt={`Avatar for ${userName}`}/>
                <a
                    href={`https://github.com/${userName}`}
                    target='blank'
                    className='link'>
                        {userName}
                </a>
            </div>
            <button className='btn-clear flex-center' onClick={onReset}>
                <FaTimesCircle color='rgb(194, 57, 42)' size={26}/>
            </button>
        </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    userName: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}
export default class Battle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            player1: null,
            player2: null,
            battle: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id, player) {
        this.setState({
            [id] : player
        })
    }
    handleReset(id){
        this.setState({
            [id] : null
        })
    }
    render() {
        const  { player1, player2, battle } = this.state
        if(battle===true){
            return <Results player1={player1} player2={player2} />
        }
        return(
            <React.Fragment>
                <Instructions />
                <div className='players-container'>
                    <h1 className='center-text header-lg'>
                        Players
                    </h1>
                    <div className='row space-around'>
                        {player1 === null 
                            ?   <PlayerInput
                                    label='Player One'
                                    onSubmit={ player => this.handleSubmit('player1', player)}
                                />
                            :   <PlayerPreview userName={ player1 } label='Player One' onReset={ () =>  this.handleReset('player1') }/>
                        }
                        {player2 === null 
                            ?   <PlayerInput
                                    label='Player Two'
                                    onSubmit={ player => this.handleSubmit('player2', player)}
                                />
                            :   <PlayerPreview userName={ player2 } label='Player Two' onReset={ () => this.handleReset('player2') }/>
                        }
                    </div>
                    {player1 && player2 && (
                        <button 
                            className='btn dark-btn btn-space'
                            onClick = {() => this.setState({battle: true})}
                        >
                            Battle
                        </button>
                    )}

                </div>
            </React.Fragment>
        )
    }
}