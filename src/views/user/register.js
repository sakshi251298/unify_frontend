import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';
import { Formik, Form, Field} from 'formik';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Personal Details', 'Qualification Details', 'Interest'];
}

const Register = ({ history , registerUserAction}) => {
  const [email] = useState('');
  const [password] = useState('');
  const [name] = useState('');
  const [hscdipstream] = useState('');
  const [degree] = useState('');
  const [degreestream] = useState('');
  const [in_sub] = useState('');
  const [in_sports] = useState('');
  const [in_loc] = useState('');
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

function getStepContent(step) {
  switch (step) {
    case 0:
      return ( <div>
      <FormGroup className="form-group has-float-label  mb-4">
        <Label>
          <IntlMessages id="user.fullname" />
        </Label>
        <Field
                      className="foe-control"
                      name="name"
            />
      </FormGroup>

      <FormGroup className="form-group has-float-label  mb-4">
        <Label>
          <IntlMessages id="user.email" />
        </Label>
        <Field
        type="email"
                      className="form-control"
                      name="email"
            />
      </FormGroup>

      <FormGroup className="form-group has-float-label  mb-4">
        <Label>
          <IntlMessages id="user.password" defaultValue={password} />
        </Label>
        <Field
            type="password"
                      className="form-control"
                      name="password"
            />
      </FormGroup></div>);
    case 1:
      return (
        <div>
          <Label className="mb-2">
            <IntlMessages id="HSC/Diploma" />
          </Label>
        <FormGroup className="form-group has-float-label  mb-4">
          <Label>
            <IntlMessages id="Stream" />
          </Label>
          <Field
                      className="form-control"
                      name="hscdipstream"
            />
        </FormGroup>
        <Label className="mb-2">
            <IntlMessages id="Under Graduate" />
          </Label>
        <FormGroup className="form-group has-float-label  mb-4">
          <Label>
            <IntlMessages id="Degree" />
          </Label>
          <Field
                      className="form-control"
                      name="degree"
            />
        </FormGroup>

        <FormGroup className="form-group has-float-label  mb-4">
          <Label>
            <IntlMessages id="Degree Stream" />
          </Label>
          <Field
                      className="form-control"
                      name="degreestream"
            />
        </FormGroup></div>
  );
    case 2:
      return (
        <div>
      <FormGroup className="form-group has-float-label  mb-4">
        <Label>
          <IntlMessages id="What subject do you want to study?" />
        </Label>
        <Field
                      className="form-control"
                      name="in_sub"
            />
        
      </FormGroup>
      <FormGroup className="form-group has-float-label  mb-4">
        <Label>
          <IntlMessages id="What sports do you play?" />
        </Label>
        <Field
                      className="form-control"
                      name="in_sports"
            />
      </FormGroup>

      <FormGroup className="form-group has-float-label  mb-4">
        <Label>
          <IntlMessages id="Which location would you most prefer?" />
        </Label>
        <Field
                      className="form-control"
                      name="in_loc"
            />
      </FormGroup></div>);
    default:
      return 'Unknown step';
  }
}
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onUserRegister = (values) => {
    // if (email !== '' && password !== '') {
    //   history.push(adminRoot);
    // }
    registerUserAction(values,history);
  };

  const initialValues = { name,  email, password, hscdipstream, degree, degreestream, in_sub, in_sports, in_loc};
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">Unify</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <CardTitle className="mb-2">
              <IntlMessages id="user.register" />
            </CardTitle>
           
            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
          <Form>
              <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button 
             color="primary"
             className="btn-shadow mr-2"
             size="lg"
              onClick={handleReset}>
            <IntlMessages id="Reset" />
            
          </Button>
          <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                >
                  <IntlMessages id="Submit" />
                </Button>
        </Paper>
      )}
    </div>
    </Form>
              </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
