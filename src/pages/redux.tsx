/*
const { name, value }: any = e.target;
// src/types/index.tsx
export interface MyStore {
    language: string;
    country: string;
    auth: {
        authenticated: boolean;
        username?: string;
    };
}

// src/constants/index.tsx
export const SET_LANGUAGE = 'SET_LANGUAGE';
export type SET_LANGUAGE = typeof SET_LANGUAGE;
export const SET_COUNTRY = 'SET_COUNTRY';
export type SET_COUNTRY = typeof SET_COUNTRY;
export const AUTHENTICATE = 'AUTHENTICATE';
export type AUTHENTICATE = typeof AUTHENTICATE;

// src/actions/index.tsx
import * as constants from '../constants';
//define action interfaces
export interface SetLanguage {
    type: constants.SET_LANGUAGE;
    language: string;
}
export interface SetCountry {
    type: constants.SET_COUNTRY;
    country: string;
}
export interface Authenticate{
    type: constants.AUTHENTICATE;
    username: string;
    pw: string;
}
//define actions
export function setLanguage(l: string): SetLanguage ({
   type: constants.SET_LANGUAGE,
   language: l
});
export function setCountry(c: string): SetCountry ({
   type: constants.SET_COUNTRY,
   country: c
});
export function authenticate(u: string, pw: string): Authenticate ({
   type: constants.AUTHENTICATE,
   username: u,
   pw: pw
});

// src/actions/index.tsx
export type Locality = SetLanguage | SetCountry;

// src/reducers/index.tsx
import { Locality } from '../actions';
import { StoreState } from '../types/index';
import { SET_LANGUAGE, SET_COUNTRY, AUTHENTICATE} from '../constants/index';
export function locality(state: StoreState, action: Locality):     StoreState {
  
  switch (action.type) {
    case SET_LANGUAGE:
      return  { ...state, language: action.language};
    case SET_COUNTRY:
      return { ...state, country: action.country};
    case AUTHENTICATE:
      return { 
         ...state, 
         auth: {
            username: action.username, 
            authenticated: true 
          }
      };
   }
  return state;
}

// src/index.tsx
import { createStore } from 'redux';
import { locality } from './reducers/index';
import { StoreState } from './types/index';

// dfff|hggg|hhggg|

const store = createStore<StoreState>(locality, {
   language: 'British (English)',
   country: 'United Kingdom',
   auth: {
       authenticated: false
   }
});


// mapStateToProps example
import { StoreState } from '../types/index';

interface LocalityProps = {
    country: string;
    language: string;
}
function mapStateToProps (state: StoreState, ownProps: LocalityProps) ({
     language: state.language,
     country: state.country,
})

const mapDispatchToProps = {
   actions.setLanguage,
   actions.setCountry
}


*/









type Props = {
  /** color to use for the background */
  color?: string;
  /** standard children prop: accepts any valid React Node */
  children: React.ReactNode;
  /** callback function passed to the onClick handler*/
  onClick: ()  => void;
}

const Button: React.FC<Props> = ({ children, color = 'tomato', onClick }) => {
   return <button style={{ backgroundColor: color }} onClick={onClick}>{children}</button>
}
type User = {
  email: string;
  id: string;
}

// the generic is the < >
// the union is the User | null
// together, TypeScript knows, "Ah, user can be User or null".
const [user, setUser] = useState<User | null>(null);





import React from 'react';

type ButtonProps = {
    /** the background color of the button */
    color: string;
    /** the text to show inside the button */
    text: string;
}

type ContainerProps = ButtonProps & {
    /** the height of the container (value used with 'px') */
  height: number;
  width:number
}

const Container: React.FC<ContainerProps> = ({ color, height, width, text }) => {
  return <div style={{ backgroundColor: color, height: `${height}px` }}>{text}</div>
}



import React, { Component, MouseEvent } from 'react';

export class Button extends Component {
  /*
   Here we restrict all handleClicks to be exclusively on 
   HTMLButton Elements
  */
  handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  /* 
    Generics support union types. This event handler works on
    HTMLButtonElement and HTMLAnchorElement (links).
  */
  handleAnotherClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    event.preventDefault();
    alert('Yeah!');
  }

  render() {
    return <button onClick={this.handleClick}>
      {this.props.children}
    </button>
  }
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

update = (e: InputEvent): void => this.props.login[e.target.name] = e.target.value;
submit = (e:  ButtonEvent): void => {
    this.props.login.logIn();
    e.preventDefault();
}


const Input = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");
    return (
        <input
            type="text"
            value={inputValue}
            onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setInputValue(ev.target.value)}
        />
    );
}

const TextArea = (): JSX.Element => {
    const [textAreaValue, setTextAreaValue] = useState<string>("");
    return (
        <textarea
            value={textAreaValue}
            onChange={(
                ev: React.ChangeEvent<HTMLTextAreaElement>,
            ): void => setTextAreaValue(ev.target.value)}
        />
    );

  const Slider = (): JSX.Element => {
    const [sliderValue, setSliderValue] = useState<number>(0);
    return (
        <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => {
                setSliderValue(
                    parseInt(ev.target.value, 10),
                );
            }}
        />
    );
  };

  const Select = (): JSX.Element => {
    const [selectValue, setSelectValue] = useState<string>(
        "optionA",
    );
    return (
        <select
            value={selectValue}
            onBlur={(
                ev: React.ChangeEvent<HTMLSelectElement>,
            ): void => setSelectValue(ev.target.value)}
        >
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
            <option value="optionC">Option C</option>
        </select>
    );
  };

  handleEvent = (e: React.SyntheticEvent<EventTarget>) => {
  const simpleInput = (e.target as HTMLInputElement).value;
  //for simple html input values
  const formInput = (e.target as HTMLFormElement).files[0];
  //for html form elements
  }

  type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

update = (e: InputEvent): void => this.props.login[e.target.name] = e.target.value;
submit = (e:  ButtonEvent): void => {
    this.props.login.logIn();
    e.preventDefault();
}

update = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    this.props.login[target.name] = target.value;
}
interface SyntheticEvent<T> {
    ...
    currentTarget: EventTarget & T;
    ...
}
update = (e: React.FormEvent<HTMLInputElement>): void => {
    this.props.login[e.currentTarget.name] = e.currentTarget.value
}