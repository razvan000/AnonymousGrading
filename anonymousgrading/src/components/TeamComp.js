import { Button } from 'primereact/button'
import React  from  'react'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import MemberComp from './MemberComp'
import ProjectComp from './ProjectComp'
import ProjectStore from './ProjectStore'
import './styles/TeamComp.css'

class TeamComp extends React.Component{
    constructor(props){
        super(props)

        this.state={
            team:{
               teamName:''
            }
        }

        this.store = new CurrentUsrTeamStore(this.props.userName)

        this.handleChange = (evt) => {
            const team = this.state.team
            team[evt.target.name] = evt.target.value
            this.setState({
              team: team
            })
          }

        this.createTeam =() =>{
            console.log(this.state.team)
            this.store.addTeam(this.state.team)
            
        }
    }

    componentDidMount(){
        this.store.getUserData(this.props.userName)
        setTimeout(()=>this.store.getTeam(),1000)
        this.store.emitter.addListener('GET_TEAM_SUCCESS',()=>this.setState({
            team:this.store.team
        }))
    }

    render(){
        return(  
            (this.state.team.id==null) ?
            // Object.keys(this.state.team).length===0 ?
            <>
            <div className="info">
              <img src="https://www.flaticon.com/svg/vstatic/svg/681/681494.svg?token=exp=1611071722~hmac=3d952880283cb4fa8ae7dc32b19e094a" 
              alt="team_icon" class="team_icon"/>
                <div>You are currently not a member of a team!</div>
                <div>Create a team yourself or wait for invitations from other teams</div>
                <hr></hr>
                <label class="text-label" htmlFor='teamname'>Team Name</label>
                <input class="input-text" type='text' name='teamname' id='teamname' onChange={this.handleChange} value={this.state.team.teamName} />
                <input class="input-btn" type='button' value='Create Team' onClick={this.createTeam} />
            </div>
            </>
            :
            <>
            <div className="info">
                <div> Team id: {this.state.team.id} | Name: {this.state.team.teamName}</div>
                <div><ProjectComp/></div>
                <div><MemberComp userName={this.store.usrName}/></div>
            </div>

            </>
        )
    }
}

export default TeamComp