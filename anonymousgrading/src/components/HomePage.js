import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'
import TeamComp from './TeamComp'

class HomePage extends Component{ 
    constructor(props){
        super(props)

    }

    render() { 
        return (
            <>
            <div><Nav userName={this.props.match.params.userName}/></div>
            <div><TeamComp userName={this.props.match.params.userName} /></div>
            </>
        )

    }

}

export default withRouter(HomePage)