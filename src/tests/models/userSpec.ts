import { UserList } from '../../models/user';

const user = new UserList();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(user.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(user.delete).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(user.authenticate).toBeDefined();
  });
});
