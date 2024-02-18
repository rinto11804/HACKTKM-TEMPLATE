package types

type UserCreateInput struct {
	Email      string `json:"email"`
	Name       string `json:"name"`
	ProfilePic string `json:"profile_pic"`
	Role       string `json:"role"`
}

type UserLoginInput struct {
	Email string `json:"email"`
}
