package util

import (
	"errors"
	"time"

	"bazi_fortune_app/backend/config"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type Claims struct {
	Sub  string `json:"sub"`
	Role string `json:"role"`
	jwt.RegisteredClaims
}

func GenerateJWT(cfg *config.Config, userID uuid.UUID, role string, ttl time.Duration) (string, error) {
	if cfg == nil || cfg.Auth.JWTSecret == "" {
		return "", errors.New("jwt secret is empty")
	}
	claims := Claims{
		Sub:  userID.String(),
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(ttl)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := []byte(cfg.Auth.JWTSecret)
	return token.SignedString(secret)
}

func ParseJWT(cfg *config.Config, tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(cfg.Auth.JWTSecret), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}
	return nil, jwt.ErrTokenInvalidClaims
}
