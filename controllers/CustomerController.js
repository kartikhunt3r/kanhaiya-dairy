import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// fetch Customers

const JWT_SECRET = process.env.JWT_SECRET;

export const fetchCustomers = async (req, res) => {
  const customer = await prisma.customer.findMany({});
  return res.json({ status: 200, data: customer });
};

export const fetchCustomer = async (req, res) => {
  const userId = req.params.id;
  const customer = await prisma.customer.findUnique({
    where: {
      id: userId,
    },
  });
  return res.json({ status: 200, data: customer });
};

// Add new Customer

export const createCustomer = async (req, res) => {
  const { email, name, password, phone, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const findCustomer = await prisma.customer.findUnique({
    where: {
      email: email,
    },
  });
  if (findCustomer) {
    res.json({ status: 200, message: "User Already Exists!!" });
  } else {
    const newCustomer = await prisma.customer.create({
      data: { email, name, hashedPassword, phone, address },
    });
    return res.json({
      status: 200,
      data: newCustomer,
      message: "Registration Successful !!!",
    });
  }
};

// Login Customer

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  const customer = prisma.customer.findUnique({
    where: {
      email: email,
    },
  });
  if (!customer) {
    res.json({ status: 400, message: "Customer does not Exists" });
  } else {
    const validPassword = await bcrypt.compare(password, customer.password);
    if (!validPassword) {
      res.json({ status: 400, message: "password is incorrect!" });
    } else {
      const token = jwt.sign(
        {
          id: customer.id,
          email: customer.email,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res.json({
        status: 200,
        token: token,
        data: customer,
        message: "Login Successful !!",
      });
    }
  }
};

// Update Customer details

export const updateCustomer = async (req, res) => {
  const userId = req.body.id;
  const { email, name, password, phone, address } = req.body;
  let updatedData = { email, name, phone, address };
  // if(password){
  //   updatedData.password
  // }
  await prisma.customer.update({
    where: {
      id: userId,
    },
    data: updatedData,
  });
  return res.json({
    status: 200,
    message: "Updated Successfully !!!",
  });
};

// Delete Customer

export const deleteCustomer = async (req, res) => {
  const userId = req.params.id;
  await prisma.customer.delete({
    where: {
      id: userId,
    },
  });
  return res.json({ status: 200, message: "Customer Deleted Successfully." });
};
