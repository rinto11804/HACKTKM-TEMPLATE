package types

type ProducerCreateInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ProducerLoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ProducerResult struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

type ProducerByIDInput struct {
	ID string `json:"id"`
}
