// 为lunar-javascript库添加TypeScript类型声明
declare module 'lunar-javascript' {
  export class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Solar;
    toString(): string;
    toYmd(): string;
    toYmdHms(): string;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
    getLunar(): Lunar;
  }

  export class Lunar {
    toString(): string;
    getYearInChinese(): string;
    getMonthInChinese(): string;
    getDayInChinese(): string;
    getYearInGanZhi(): string;
    getYearInGanZhiByLiChun(): string;
    getYearInGanZhiExact(): string;
    getMonthInGanZhi(): string;
    getMonthInGanZhiExact(): string;
    getDayInGanZhi(): string;
    getDayInGanZhiExact(): string;
    getDayInGanZhiExact2(): string;
    getTimeInGanZhi(): string;
    getYearShengXiao(): string;
    getFestivals(): string[];
    getOtherFestivals(): string;
    getSolar(): Solar;
    getHour(): number;
  }

  export class LunarYear {
    static fromYear(year: number): LunarYear;
    getMonth(month: number): any;
  }
}