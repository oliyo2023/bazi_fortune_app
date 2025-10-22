package models

import (
)

type LunarData struct {
	Year       int    `json:"year"`
	Month      int    `json:"month"`
	Day        int    `json:"day"`
	DayInGanZhi string `json:"day_in_gan_zhi"`
	LunarYear  string `json:"lunar_year"`
	LunarMonth string `json:"lunar_month"`
	LunarDay   string `json:"lunar_day"`
	SolarTerm  string `json:"solar_term"`
	Week       string `json:"week"`
	Suit       []string `json:"suit"`
	Taboo      []string `json:"taboo"`
	GzYear     string `json:"gz_year"`
	GzMonth    string `json:"gz_month"`
	GzDay      string `json:"gz_day"`
	GzTime     string `json:"gz_time"`
}