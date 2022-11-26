import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { DashboardLayout } from "./Layouts/DashboardLayout/DashboardLayout";

import { PostsPage } from "./pages/PostsPage/PostsPage";
import { AlbumsPage } from "./pages/AlbumsPage/AlbumsPage";
import { TodosPage } from "./pages/TodosPage/TodosPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

import { NewPostForm, EditAlbum } from "./components";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="posts" replace />} />

        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/create" element={<NewPostForm />} />
        <Route path="/posts/edit/:postId" element={<NewPostForm />} />

        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/edit/:albumId" element={<EditAlbum />} />

        <Route path="/todos" element={<TodosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
