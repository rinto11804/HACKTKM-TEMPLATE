package types

type ProducerCreateInput struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type ProducerResult struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type ProducerByIDInput struct {
	ID string `json:"id"`
}
