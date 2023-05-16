package main

import (
	"context"
	"fmt"
	"github.com/mateothegreat/wails-angular-template/backend/pkg/local/service"
	"github.com/mateothegreat/wails-angular-template/backend/pkg/model"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// var folders []model.Folder
var fs map[string]model.Folder
var currentFolderId string

const defaultHome = "/Users/U774197/docpack_files"

var appHome string

type App struct {
	ctx     context.Context
	storage *service.LocalStorageService
}

func NewApp() *App {
	return &App{
		storage: service.NewLocalStorageService(),
	}
}

func (b *App) startup(ctx context.Context) {
	b.ctx = ctx
	fs = make(map[string]model.Folder)
	loadLocalConfig()
	b.storage.CreateHomeFolder(appHome)
	for _, v := range b.storage.ListDirsInMain() {
		fmt.Println("add to map: " + v.Name)
		fs[v.FolderId] = v
	}

}

func loadLocalConfig() {
	// if config missing start login register window and create config
	// else download config and create service
	//path, err := os.Getwd()
	//
	//if err != nil {
	//	log.Println(err)
	//}
	//
	//fmt.Println(path)
	appHome = defaultHome
}

func (b *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

func (b *App) OpenFilesDialog() {
	selection, err := runtime.OpenMultipleFilesDialog(b.ctx, runtime.OpenDialogOptions{
		Title: "Choose your files",
	})
	if err != nil {
		panic(err)
	}
	if v, found := fs[b.GetCurrentFolderId()]; found {
		b.storage.CopyFilesToFolder(selection, v.Name)
	}
}

func (b *App) CreateNewDocFolder(dirName string) model.Folder {
	folder := b.storage.CreateNewFolder(dirName)
	fs[folder.FolderId] = folder
	return folder
}

func (b *App) DeleteFolder(id string) {
	if v, found := fs[id]; found {
		b.storage.DeleteFolder(v.Name)
		delete(fs, v.FolderId)
	}
}

func (b *App) RenameFolder(currentId, newName string) {
	if v, found := fs[currentId]; found {
		b.storage.RenameFolder(v.Name, newName)
		v.Name = newName
		fs[currentId] = v
	}
}

func (b *App) GetFolders() []model.Folder {
	folders := make([]model.Folder, 0)
	for _, value := range fs {
		fmt.Println("added to array: " + value.Name)
		folders = append(folders, value)
	}
	fmt.Println("array size:", len(folders))
	return folders
}

func (b *App) SetCurrentFolderId(id string) string {
	currentFolderId = id
	return currentFolderId
}

func (b *App) GetCurrentFolderId() string {
	return currentFolderId
}

func (b *App) domReady(ctx context.Context) {

}
