package helpers

import (
	"crypto/sha256"
	"fmt"
)

type MerkleNode struct {
	Hash  string
	Left  *MerkleNode
	Right *MerkleNode
}

func calculateHash(data string) string {
	hash := sha256.Sum256([]byte(data))
	return fmt.Sprintf("%x", hash)
}

func BuildMerkleTree(data []string) *MerkleNode {
	if len(data) == 1 {
		return &MerkleNode{Hash: calculateHash(data[0]), Left: nil, Right: nil}
	}
	mid := len(data) / 2
	left := BuildMerkleTree(data[:mid])
	right := BuildMerkleTree(data[mid:])
	return &MerkleNode{Hash: calculateHash(left.Hash + right.Hash), Left: left, Right: right}
}
