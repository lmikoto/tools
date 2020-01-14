import Cron from "@/pages/cron-editor-react/src";
import React from "react";

export default () => <Cron
    onChange={()=>{}}
    tabType="card"
    showCrontab={false}
    value="0 0 0 * * ?"
  />
