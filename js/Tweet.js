class Tweet extends HashQuery {
  constructor(jsonOverview, jsonDetail, userData, minutesRank) {
    super([]);
    for(let key in jsonDetail) {
      let monthlyDetailData = jsonDetail[key];
      for(let i = 0; i < monthlyDetailData.length; ++i) {
        let record = monthlyDetailData[i];
        let tmp = {
          id: record.id,
          created_at: new Date(record.created_at)
        };
        this.data.push(tmp);
      }
    }
  }
}
