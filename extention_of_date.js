function next_year(date, delta_y){
  date.setFullYear(date.getFullYear() + delta_y);
}

function next_month(date, delta_m){
  date.setMonth(date.getMonth() + delta_m);
}

function next_date(date, delta_d){
  date.setDate(date.getDate() + delta_d);
}

function next_hours(date, delta_h){
  date.setHours(date.getHours() + delta_h);
}

function next_minutes(date, delta_m){
  date.setMinutes(date.getMinutes() + delta_m);
}
