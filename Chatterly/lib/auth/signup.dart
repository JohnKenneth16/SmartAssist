import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class SignUpScreen extends StatefulWidget {
  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final nameCtrl = TextEditingController();
  final birthDateCtrl = TextEditingController();
  final emailCtrl = TextEditingController();
  final passwordCtrl = TextEditingController();

  void signUp(String role) async {
    try {
      await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: emailCtrl.text.trim(),
        password: passwordCtrl.text.trim(),
      );
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Signed up as $role")));
      Navigator.pop(context);
    } catch (e) {
      print("Signup error: $e");
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Signup failed")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black87,
      body: Padding(
        padding: EdgeInsets.all(24),
        child: ListView(
          children: [
            SizedBox(height: 60),
            Image.asset('assets/logo.png', height: 80),
            Text("Chatterly", style: TextStyle(color: Colors.white, fontSize: 24), textAlign: TextAlign.center),
            SizedBox(height: 30),
            TextField(controller: nameCtrl, decoration: InputDecoration(hintText: "Name")),
            TextField(controller: birthDateCtrl, decoration: InputDecoration(hintText: "Birth date")),
            TextField(controller: emailCtrl, decoration: InputDecoration(hintText: "Email")),
            TextField(controller: passwordCtrl, decoration: InputDecoration(hintText: "Password"), obscureText: true),
            SizedBox(height: 20),
            ElevatedButton(onPressed: () => signUp("Student"), child: Text("Student")),
            ElevatedButton(onPressed: () => signUp("Teacher"), child: Text("Teacher")),
          ],
        ),
      ),
    );
  }
}
