class Tweet extends HashQuery {
  constructor(userData) {
    super([]);
    for(let key in userData) {
      if(/\d{4}_\d{2}/.test(key)) {
        let monthlyDetailData = userData[key];
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
}
