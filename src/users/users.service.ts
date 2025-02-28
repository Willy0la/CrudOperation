import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      this.users.filter((user) => user.role === role);
    }
  }

  findOne(id: number) {
    const user =  this.users.find((user) => user.id === id);

    return user;
  }

   create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'INTERN' | 'ENGINEER';
  }) {
    const newByHighestId = [...this.users.sort((a, b) => b.id - a.id)];

    const newUser =  { id: newByHighestId[0].id + 1, ...user };

    return this.users.push(newUser);
  }

   update(
    id: number,
    userUpdate: {
      name: string;
      email: string;
      role?: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }

      return this.users;
    });

    return this.findOne(id);
  }

   delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}