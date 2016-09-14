import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setMainPage } from '../actions/mainPage'
import Main from './main'

const mapStateToProps = ({ mainPage }) => {
  return {
    mainPage
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setMainPage
}, dispatch)

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default MainContainer

