package handlers

import (
	"net/http"
	"strconv"

	"github.com/6tail/lunar-go/calendar"
	"github.com/gin-gonic/gin"

	"bazi_fortune_app/backend/models"
)

// GetLunarData handles requests to get lunar calendar data for a specific date.
// @Summary Get Lunar Calendar Data
// @Description Get lunar calendar data (old almanac) for a specified date.
// @Tags Lunar
// @Accept json
// @Produce json
// @Param year query int true "Year (e.g., 2023)"
// @Param month query int true "Month (1-12)"
// @Param day query int true "Day (1-31)"
// @Success 200 {object} models.LunarData "Successfully retrieved lunar data"
// @Failure 400 {object} map[string]string "Invalid date parameters"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /lunar [get]
func GetLunarData(c *gin.Context) {
	yearStr := c.Query("year")
	monthStr := c.Query("month")
	dayStr := c.Query("day")

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid year parameter"})
		return
	}
	month, err := strconv.Atoi(monthStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid month parameter"})
		return
	}
	day, err := strconv.Atoi(dayStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid day parameter"})
		return
	}

	// Assuming default hour, minute, second to 0 for now
	l := calendar.NewLunar(year, month, day, 0, 0, 0)

	// 将 *list.List 转换为 []string
	suitList := l.GetDayYi()
	suit := make([]string, 0)
	for e := suitList.Front(); e != nil; e = e.Next() {
		suit = append(suit, e.Value.(string))
	}

	tabooList := l.GetDayJi()
	taboo := make([]string, 0)
	for e := tabooList.Front(); e != nil; e = e.Next() {
		taboo = append(taboo, e.Value.(string))
	}

	lunarData := models.LunarData{
		Year:     l.GetYear(),
		Month:    l.GetMonth(),
		Day:      l.GetDay(),
		DayInGanZhi: l.GetDayInGanZhi(),
		Suit:     suit,
		Taboo:    taboo,
	}

	c.JSON(http.StatusOK, lunarData)
}