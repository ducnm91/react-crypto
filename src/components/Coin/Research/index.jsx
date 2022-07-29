import React from "react";

import Luna from "./Luna";
import Sol from "./Sol";
import Near from "./Near";
import Ftm from "./Ftm"
import Flow from "./Flow";
import Atom from "./Atom";
import Avax from "./Avax";
import Ftt from "./Ftt";
import Dot from "./Dot";
import Gala from "./Gala";
import Kava from "./Kava";
import Mana from "./Mana";
import Enj from "./Enj";
import Dydx from "./Dydx";
import Inj from "./Inj";
import Ygg from "./Ygg";
import Grt from "./Grt";
import Xtz from "./Xtz"; 

const components = {
  luna: Luna,
  sol: Sol,
  near: Near,
  ftm: Ftm,
  flow: Flow,
  atom: Atom,
  avax: Avax,
  ftt: Ftt,
  dot: Dot,
  gala: Gala,
  kava: Kava,
  mana: Mana,
  enj: Enj,
  dydx: Dydx,
  inj: Inj,
  ygg: Ygg,
  grt: Grt,
  Xtz
}

const Research = (props) => {
  if (components[props.symbol]) {
    const ResearchComponent = components[props.symbol];
    return <ResearchComponent />
  }
  return (<p>No data</p>)
}

export default Research;