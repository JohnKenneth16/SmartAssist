import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../home/teacher_home.dart';
import '../home/student_home.dart';
import 'signup.dart';

class LoginScreen extends StatelessWidget {
  final emailCtrl = TextEditingController();
  final passwordCtrl = TextEditingController();

  void login(BuildContext context) async {
    try {
      UserCredential user = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: emailCtrl.text.trim(),
        password: passwordCtrl.text.trim(),
      );

      final userEmail = user.user?.email ?? "";
      if (userEmail.contains("teacher")) {
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => TeacherHome()));
      } else {
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => StudentHome()));
      }
    } catch (e) {
      print("Login error: $e");
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Login failed")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black87,
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset('assets/logo.png', height: 100),
              Text("Chatterly", style: TextStyle(color: Colors.white, fontSize: 28)),
              SizedBox(height: 40),
              TextField(controller: emailCtrl, decoration: InputDecoration(hintText: "Email")),
              TextField(controller: passwordCtrl, decoration: InputDecoration(hintText: "Password"), obscureText: true),
              SizedBox(height: 20),
              ElevatedButton(onPressed: () => login(context), child: Text("Log In")),
              TextButton(
                  onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => SignUpScreen())),
                  child: Text("Sign Up", style: TextStyle(color: Colors.white70)))
            ],
          ),
        ),
      ),
    );
  }
}
