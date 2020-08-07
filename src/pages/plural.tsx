interface Props {
  products: string[];
}

interface State {
  quantities: { [key: string]: number };
}

class ShoppingBasket extends React.Component<Props, State> {
  static defaultProps: Props = {
    products: []
  };

  state: Readonly<State> = {
    quantities: this.props.products.reduce((acc, product) => {
      acc[product] = 1;
      return acc;
    }, {})
  };

  render() {
    const { products } = this.props;
    const { quantities } = this.state;

    return (
      <div>
        <ul>
          {products.map((product) => (
            <li>
              <h2>{product}</h2>
              <p>
                Quantity:
                <input type="number" value={quantities[product]} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const ProductDisplay = (props: { title: string }) => <h2>{props.title}</h2>;



const ProductDisplay: React.FunctionComponent<{ title: string }> = (props) => (
  <h2>
    {props.title} {props.children}
  </h2>
);


// inferred as number
const [value, setValue] = useState(0);

// explicitly setting the types
const [value, setValue] = useState<number | undefined>(undefined);
const [value, setValue] = useState<Array<number>>([]);

interface MyObject {
  foo: string;
  bar?: number;
}
const [value, setValue] = useState<MyObject>({ foo: 'hello' });
const MyInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
    return <input ref={inputRef} />
    

    interface State {
  value: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'incrementAmount'; amount: number };

const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - 1 };
    case 'incrementAmount':
      return { value: state.value + action.amount };
    default:
      throw new Error();
  }
};

const [state, dispatch] = useReducer(counterReducer, { value: 0 });

dispatch({ type: 'increment' });
dispatch({ type: 'decrement' });
dispatch({ type: 'incrementAmount', amount: 10 });

// TypeScript compilation error
    dispatch({ type: 'invalidActionType' });

    interface Place{
  city:string,
  country:string
}
const initialState:Place = {
  city: 'Rosebud',
  country: 'USA'
};
function reducer(state:Place, action):Partial<Place> {
  switch (action.type) {
    case 'city':
      return { city: action.payload };
    case 'country':
      return { country: action.payload };
  }
}
  
  
  
function PlaceForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
return (
    <form>
      <input type="text" name="city"  onChange={(event) => {
          dispatch({ type: 'city',payload: event.target.value})
        }} 
        value={state.city} />
      <input  type="text"  name="country"   onChange={(event) => {
          dispatch({type: 'country', payload: event.target.value })
        }}
 
        value={state.country} />
   </form>
  );
}


interface Animal {}
 
interface Cat extends Animal {
  meow: () => string;
}
 
const duck = {age: 7};
const felix = {
  age: 12,
  meow: () => "Meow"
};
 
const listOfAnimals: Animal[] = [duck];
const listOfCats: Cat[] = [felix];
 
 
function MyApp() {
  
  const [cats , setCats] = useState<Cat[]>(listOfCats);
  // Here the thing:  listOfCats is declared as a Animal[]
  const [animals , setAnimals] = useState<Animal[]>(listOfCats)
  const [animal , setAnimal] = useState(duck)
 
  return <div onClick={()=>{
    animals.unshift(animal) // we set as first cat a duck !
    setAnimals([...animals]) // dirty forceUpdate
    }
    }>
    The first cat says {cats[0].meow()}</div>;
}

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

    };

 

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {

        setName(e.target.value);

    };


    import React, {ChangeEvent, FormEvent, useState} from "react";

import {Form, Input, Button} from "antd";

 

interface Props {

}

 

const StateHooksComponent: React.FC<Props> = ({}) => {

 

    const [name, setName] = useState<string>('');

 

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        console.log(name);

    };

 

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {

        setName(e.target.value);

    };

 

    return (

        <Form layout="inline" onSubmit={handleSubmit}>

            <Form.Item>

                <Input type="text" placeholder="name" value={name} onChange={onNameChange} />

                <Button htmlType="submit" type="primary"> Submit </Button>

            </Form.Item>

        </Form>

    )

}

 

export default StateHooksComponent;

