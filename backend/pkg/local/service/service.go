package service

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/mateothegreat/wails-angular-template/backend/pkg/model"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type LocalStorageService struct {
	appHomeFolder string
}

func NewLocalStorageService() *LocalStorageService {
	return &LocalStorageService{}
}

func (s *LocalStorageService) ListDirsInMain() []model.Folder {
	folders := make([]model.Folder, 0)
	for _, e := range listFolder(s.appHomeFolder) {
		if e.IsDir() {
			files := make([]model.File, 0)
			for _, f := range listFolder(s.appHomeFolder + "/" + e.Name()) {
				if !f.IsDir() && (strings.HasSuffix(f.Name(), ".pdf")) {
					files = append(files, model.File{FileId: uuid.New().String(), Name: f.Name()})
				}
			}
			folders = append(folders, model.Folder{FolderId: uuid.New().String(), Name: e.Name(), Files: files})
		}
		fmt.Println(e.Name())
	}

	return folders
}

func (s *LocalStorageService) CreateNewFolder(dirName string) model.Folder {
	if err := os.MkdirAll(s.appHomeFolder+"/"+dirName, 0770); err != nil {
		fmt.Println("failed")
	}
	for _, f := range listFolder(s.appHomeFolder) {
		if f.IsDir() && f.Name() == dirName {
			files := make([]model.File, 0)
			return model.Folder{FolderId: uuid.New().String(), Name: dirName, Files: files}
		}
	}
	return model.Folder{}
}

func (s *LocalStorageService) CopyFilesToFolder(selection []string, folderName string) {
	for _, selectedFileName := range selection {
		go copyFileToFolder(selectedFileName, s.appHomeFolder+"/"+folderName)
	}
}

func (s *LocalStorageService) CreateHomeFolder(homeFolder string) {
	s.appHomeFolder = homeFolder
	if _, err := os.Stat(homeFolder); os.IsNotExist(err) {
		os.MkdirAll(homeFolder, 0770)
		fmt.Println("Directory created")
	} else {
		fmt.Println("Directory already exists")
	}
}

func (s *LocalStorageService) DeleteFolder(targetFolder string) {
	err := os.RemoveAll(s.appHomeFolder + "/" + targetFolder)
	if err != nil {
		fmt.Println("delete folder error")
		log.Fatal(err)
	}
	fmt.Println("delete folder done")
}

func (s *LocalStorageService) RenameFolder(oldName string, newName string) {
	err := os.Rename(s.appHomeFolder+"/"+oldName, s.appHomeFolder+"/"+newName)
	if err != nil {
		log.Fatal(err)
	}
}

func listFolder(path string) []os.DirEntry {
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	return entries
}

func copyFileToFolder(selectedFileName string, targetPath string) {
	f, err := os.Open(selectedFileName)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	_, fileName := filepath.Split(selectedFileName)

	dst, err := os.Create(filepath.Join(targetPath, filepath.Base(fileName)))
	io.Copy(dst, f)
}
