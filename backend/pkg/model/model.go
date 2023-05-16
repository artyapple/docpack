package model

type Folder struct {
	FolderId string `json:"folderId"`
	Name     string `json:"name"`
	Files    []File `json:"files"`
}

type File struct {
	FileId string `json:"fileId"`
	Name   string `json:"name"`
}
