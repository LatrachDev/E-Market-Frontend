import { useState } from "react";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "../../hooks/useUsers";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

export default function AdminUsers() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = (data) => {
    if (editingUser) {
      updateUser.mutate({ id: editingUser.id, data });
      setEditingUser(null);
    } else {
      createUser.mutate(data);
    }
  };

  const handleEdit = (user) => setEditingUser(user);
  const handleDelete = (id) => deleteUser.mutate(id);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>

      <UserForm onSubmit={handleSubmit} defaultValues={editingUser} />

      <UserTable users={users} onUpdate={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
