import React, { useEffect } from "react";
import moment from "moment";

import RepositoryFactory from "../../repositories/RepositoryFactory";

const WhaleAlertResponsitory = RepositoryFactory.get('whale_alert')

const WhaleAlert = () => {
  useEffect(() => {
    const startTime = moment().subtract(1, 'minutes').unix()
    WhaleAlertResponsitory.getTransactions(500000, startTime).then(res => {
      console.log(res)
    })
  }, [])
  return (
    <p>Whale alert</p>
  )
}

export default WhaleAlert;