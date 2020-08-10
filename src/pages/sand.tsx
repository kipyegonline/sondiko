import React from "react";

export function Sandbox() {
  const [text, setText] = React.useState<string>("");

  const tasks: string[] = [];

  console.log(text, tasks);
  return (
    <div className="cont">
      <Kygo name={"Vince"} locale={text} />
      <Iselin />
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
          setText((e.target as HTMLTextAreaElement).value)
        }
        value={text}
        onBlur={(): string[] => [...tasks, text]}
      ></textarea>
      <p>Let's keep dancing o a brokwn glass</p>
      <ul id="tasks"></ul>
      <NewAlbums {...albums} />
      <Count count={1} />
      <style>{`
          .cont{background:#aaa; padding:1rem; margin:1rem;}`}</style>
    </div>
  );
}
export default Sandbox;
type albums = {
  name: string;
  artist: string;
  year: number;
};
const albums = { name: "Golden Hour", artist: "Kygo", year: 2020 };

const NewAlbums: React.FC<albums> = ({ name, artist, year }) => {
  return (
    <div>
      <h6>{name}</h6>
      <p>{artist}</p>
      <small>{year}</small>
      <button onClick={() => alert("Hey")}>Listen</button>
    </div>
  );
};
interface MusicPlayer {
  volume: number;
  setVolume(vol: number): void;
  play(): void;
  pause(): void;
  stop(): void;
  rewind(seconds: number): void;
  fastForward(seconds: number): void;
}

class Radio implements MusicPlayer {
  public volume: number;
  public setVolume(vol: number) {
    this.volume = vol;
  }
  play() {
    console.log("Playing the damn radio at volume " + this.volume);
  }
  pause() {
    console.log("Pausing the damn radio");
  }
  stop() {
    console.log("stoping damn radio");
  }
  rewind() {
    console.log("Rewinding the damn radio");
  }
  fastForward() {
    console.log("Fast forwading the  damn radio");
  }
}
let myRadio: Radio = new Radio();
myRadio.setVolume(10);
myRadio.play();

interface Ami {
  name: string;
  home: string;
  age: number;
  married: boolean;
  des(): string;
}
let myDes: Ami = {
  name: "Vince Kipyegon",
  home: "Litein",
  age: 22,
  married: false,
  des: function () {
    return `My name is ${this.name} from ${this.home}...I am ${
      this.married ? " " : "not "
    }married`;
  }
};
console.log(myDes.des());

interface Props {
  count: number;
}

const Count: React.FC<Props> = (props) => {
  return <h1>{props.count}</h1>;
};
type Istate = {
  name: string;
  locale?: string;
};
type Iprops = {
  name: string;
  locale?: string;
};

class Kygo extends React.Component<Iprops, Istate> {
  state = {
    name: this.props.name,
    locale: this.props.locale
  };
  UNSAFE_componentWillReceiveProps(nextState: Iprops) {
    this.setState({ locale: nextState.locale });
  }
  render() {
    const { name, locale } = this.state;
    return (
      <div>
        <p>
          Rendering Kygo {name} - {locale}
        </p>
      </div>
    );
  }
}

function Iselin(): JSX.Element {
  const handleBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Oh my god", e);
  };
  return (
    <div>
      <p>Even just for a moment....</p>;
      <button onClick={handleBtn}>Change</button>
    </div>
  );
}
