import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LogIn from './class/Login.js'
import {FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE} from './constants'
import {SETTING_ACCOUNT, SETTING_NOTIFICATION, SETTING_EDITREGIMEN, SETTING_ABOUT, SETTING_SUPPORT} from './constants.js'
import {REGIMEN_INFUSIONCYCLE, REGIMEN_INFUSIONNUM, REGIMEN_DATE} from './constants.js'
import {SYSMTOM_OBSERVATION} from './constants.js'
import {SIGNUP_EMAIL, SIGNUP_PASSWORD, SIGNUP_USERINFO} from './constants.js'
import {
  ADD_SYMPTOMS,
  EFFECT_FATIGUE,
  EFFECT_NAUSEA,
  EFFECT_FEVER,
  EFFECT_PAIN,
  EFFECT_CLICKED_FATIGUE,
  EFFECT_CLICKED_NAUSEA,
  EFFECT_CLICKED_FEVER,
  EFFECT_CLICKED_PAIN
} from './constants.js'

const mapStateToProps = state => ({
  email: state.signUp_email,
  password: state.signUp_password,
  userInfo: state.signUp_userInfo,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
