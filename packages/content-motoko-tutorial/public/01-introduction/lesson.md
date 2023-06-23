Welcome to the Motoko tutorial. In this tutorial, you will learn the basics of the Motoko programming
language and how to use it to build programs on the Internet Computer.

## What is Internet Computer?

Internet Computer is a decentralized blockchain project developed by the DFINITY Foundation. The
goal of the project is to provide a platform that hosts smart contracts and data in a decentralized
way. What's unique about the Internet Computer is that the whole application, UI included, is hosted
on the chain.

## What is Motoko?

Motoko is a programming language designed specifically for the Internet Computer. Motoko is a
language with all the usual features you would expect from a modern programming language, such as
strong typing, automatic memory management, generics, type inference and others.

For concurrency Motoko uses the **actor model**: a computational model for concurrent and distributed systems. Each
actor is an autonomous entity which encapsulates state and behavior, and communicates with other
actors exclusively through asynchronous message passing. You will learn more about actors later in
the tutorial.

Motoko is compiled into WebAssembly, which is then executed by the Internet Computer's virtual machine.
This means that Motoko is not the only language that can be used to write smart contracts for the
Internet Computer. However, Motoko has been designed with the specific requirements of the platform
in mind, making it the recommended language for writing smart contracts.

## How to use this tutorial

This tutorial consists of small exercises, where each exercise teaches you a new concept of the
Motoko language. Each exercise is a small program that you can run and play with. Later exercises
build on the previous ones, so it is recommended to go through them in order. If you are already
familiar with the Motoko, or need to learn about a specific feature, feel free to skip to any exercise
you wish.
